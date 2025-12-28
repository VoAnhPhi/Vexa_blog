(function () {
	const SELECTORS = [".sidebar", "nav[aria-label='Sidebar']", "nav[aria-label='Side navigation']", "[data-sidebar]"];

	const STORAGE_KEY = "starlight:sidebar:userOpen";
	const CLICK_GUARD_MS = 400; // tránh observer đóng ngay sau click
	let lastUserActionAt = 0;

	function now() {
		return Date.now();
	}

	function getSidebarRoot() {
		for (const sel of SELECTORS) {
			const el = document.querySelector(sel);
			if (el) return el;
		}
		return null;
	}

	function getDetailsKey(detailsEl) {
		const summary = detailsEl.querySelector(":scope > summary");
		const label = (summary?.textContent || "").trim().toLowerCase();
		// key theo text group; đủ ổn cho autogenerate sections
		return label || null;
	}

	function loadUserOpenSet() {
		try {
			const raw = sessionStorage.getItem(STORAGE_KEY);
			const arr = raw ? JSON.parse(raw) : [];
			return new Set(Array.isArray(arr) ? arr : []);
		} catch {
			return new Set();
		}
	}

	function saveUserOpenSet(set) {
		try {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
		} catch {
			// ignore
		}
	}

	function closeAll(root) {
		const openOnes = root.querySelectorAll("details[open]");
		for (const d of openOnes) {
			d.open = false;
			d.removeAttribute("open");
		}
	}

	function applyUserState(root) {
		const userOpen = loadUserOpenSet();
		const all = Array.from(root.querySelectorAll("details"));

		// 1) đóng tất cả (đè auto-open)
		closeAll(root);

		// 2) mở lại các group user đã mở
		for (const d of all) {
			const key = getDetailsKey(d);
			if (!key) continue;

			if (userOpen.has(key)) {
				d.open = true;
				d.setAttribute("open", "");
			}
		}
	}

	function bindClicks(root) {
		const all = Array.from(root.querySelectorAll("details"));

		for (const d of all) {
			const summary = d.querySelector(":scope > summary");
			if (!summary) continue;

			if (summary.dataset.lockBound === "1") continue;
			summary.dataset.lockBound = "1";

			summary.addEventListener("click", () => {
				lastUserActionAt = now();

				// Sau click, native <details> toggle sẽ xảy ra.
				// Đợi 1 tick để đọc trạng thái mới rồi lưu.
				setTimeout(() => {
					const key = getDetailsKey(d);
					if (!key) return;

					const userOpen = loadUserOpenSet();

					if (d.open) userOpen.add(key);
					else userOpen.delete(key);

					saveUserOpenSet(userOpen);
				}, 0);
			});
		}
	}

	function debounce(fn, wait) {
		let t = null;
		return function () {
			if (t) clearTimeout(t);
			t = setTimeout(fn, wait);
		};
	}

	function applyLock() {
		const root = getSidebarRoot();
		if (!root) return;

		// Guard: nếu vừa có thao tác user (click) thì đừng auto-close ngay
		if (now() - lastUserActionAt < CLICK_GUARD_MS) return;

		bindClicks(root);
		applyUserState(root);
	}

	// Initial load
	const safeApply = () => applyLock();

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", safeApply);
	} else {
		safeApply();
	}

	// Astro navigation
	document.addEventListener("astro:page-load", safeApply);

	// Observe ONLY sidebar subtree (không observe toàn document)
	const setupObserver = () => {
		const root = getSidebarRoot();
		if (!root) return;

		const debounced = debounce(() => applyLock(), 80);

		const mo = new MutationObserver(() => {
			// nếu user vừa click thì thôi, tránh tự đóng
			if (now() - lastUserActionAt < CLICK_GUARD_MS) return;
			debounced();
		});

		mo.observe(root, { subtree: true, childList: true });
	};

	setupObserver();
})();
