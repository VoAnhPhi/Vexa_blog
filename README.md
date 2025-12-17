# Vexa Blog

A professional knowledge base and documentation hub designed for long-term technical learning, systematization, and portfolio presentation. This project serves as a centralized reference for engineering concepts, architectural patterns, and development standards.

## 🎯 Purpose

This documentation hub exists to:

-   **Systematize Knowledge:** Convert ephemeral learning into structured, retrievable documentation.
-   **Showcase Technical Depth:** Demonstrate proficiency across multiple domains of software engineering.
-   **Facilitate Reference:** Provide a quick, reliable source of truth for complex technical topics.

**Target Audience:** Professional developers and engineers. Content assumes a strong baseline understanding of software development life cycles and terminology.

## 🛠 Tech Stack

-   **Core:** [Astro](https://astro.build/)
-   **Theme/Integration:** [Starlight](https://starlight.astro.build/)
-   **Content Authoring:** MDX (Markdown + JSX context)

## 📂 Project Structure

Key content is located in `src/content/docs`. The directory structure reflects the domain-driven organization of the knowledge base:

```text
src/content/docs/
├── ba/          # Business Analysis, Requirements Engineering, UML
├── backend/     # System Design, APIs, Databases, DevOps
├── frontend/    # Ecosystems, Frameworks, Web Performance
├── languages/   # Language-specific Deep Dives (Syntax, Memory Models)
└── ui-ux/       # Design Systems, Accessibility, Interaction Design
```

## 🧠 Content Organization Philosophy

The categorization strategy separates concerns to mirror real-world engineering roles:

-   **Frontend / Backend:** Decouples implementation details to focus on domain-specific best practices and ecosystems.
-   **Programming Languages:** Separates syntax and core language concepts from framework implementations (e.g., _JavaScript_ core vs. _React_ patterns).
-   **Business Analysis (BA):** Focuses on the "Why" and "What" of software: requirements gathering, process modeling, and system specs.
-   **UI/UX:** Focuses on the "How" of interaction: accessibility standards, design tokens, and user-centric principles.

## � Local Development

```bash
# Install dependencies
npm install

# Start local development server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```
