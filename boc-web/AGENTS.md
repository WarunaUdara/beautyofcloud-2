# 🤖 AI Agent Quick-Start Guide

Welcome to the Beauty of Cloud project! 

Before writing any code or modifying the structure, please read the **[`PROJECT_GUIDE.md`](file:///home/senidu/PROJECTS/beautyofcloud-2/boc-web/PROJECT_GUIDE.md)**. 

### Key Rules:
1.  **Scoped Layouts**: Admin data (Tasks/Meetings) is restricted to `/admin/layout.tsx`. Do NOT move these providers to the root layout without specific instructions.
2.  **Centralized Types**: All data interfaces MUST be imported from `@/types`.
3.  **Firebase API**: Use the exported CRUD methods in `src/firebase/api.ts` rather than writing raw queries in components.
4.  **Aesthetics**: Maintain the premium "Glassmorphism" design language on all new pages.

Happy coding! 🚀
