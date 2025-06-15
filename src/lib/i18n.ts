
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    common: {
      "welcome": "Welcome to Solidarity Web Weave",
      "language": "Language",
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      "cancel": "Cancel",
      "save": "Save",
      "edit": "Edit",
      "delete": "Delete",
      "search": "Search",
      "filter": "Filter",
      "all": "All",
      "create": "Create",
      "close": "Close"
    },
    navigation: {
      "home": "Home",
      "dashboard": "Dashboard",
      "food_security": "Food Security",
      "energy_democracy": "Energy Democracy",
      "mutual_aid": "Mutual Aid",
      "tool_library": "Tool Library",
      "community_garden": "Community Garden",
      "community_wealth": "Community Wealth",
      "childcare_coop": "Childcare Coop",
      "elder_care": "Elder Care",
      "disaster_prep": "Disaster Prep",
      "skills": "Skills Exchange",
      "organizing": "Organizing",
      "security": "Security",
      "sovereignty": "Sovereignty",
      "defense": "Defense",
      "profile": "Profile",
      "settings": "Settings",
      "sign_in": "Sign In",
      "sign_out": "Sign Out"
    },
    skills: {
      "title": "Skills Exchange",
      "description": "Share knowledge, learn from others, and build community capacity",
      "project_showcase": "Project Showcase",
      "knowledge_base": "Knowledge Base",
      "skill_marketplace": "Skill Marketplace",
      "learning_courses": "Learning Courses",
      "all_projects": "All Projects",
      "my_projects": "My Projects",
      "share_project": "Share Project",
      "all_articles": "All Articles",
      "my_articles": "My Articles",
      "write_article": "Write Article",
      "offer_skill": "Offer a Skill",
      "create_course": "Create Course"
    }
  },
  es: {
    common: {
      "welcome": "Bienvenido a Solidarity Web Weave",
      "language": "Idioma",
      "loading": "Cargando...",
      "error": "Error",
      "success": "Éxito",
      "cancel": "Cancelar",
      "save": "Guardar",
      "edit": "Editar",
      "delete": "Eliminar",
      "search": "Buscar",
      "filter": "Filtrar",
      "all": "Todos",
      "create": "Crear",
      "close": "Cerrar"
    },
    navigation: {
      "home": "Inicio",
      "dashboard": "Panel",
      "food_security": "Seguridad Alimentaria",
      "energy_democracy": "Democracia Energética",
      "mutual_aid": "Ayuda Mutua",
      "tool_library": "Biblioteca de Herramientas",
      "community_garden": "Huerto Comunitario",
      "community_wealth": "Riqueza Comunitaria",
      "childcare_coop": "Coop de Cuidado Infantil",
      "elder_care": "Cuidado de Ancianos",
      "disaster_prep": "Preparación para Desastres",
      "skills": "Intercambio de Habilidades",
      "organizing": "Organización",
      "security": "Seguridad",
      "sovereignty": "Soberanía",
      "defense": "Defensa",
      "profile": "Perfil",
      "settings": "Configuración",
      "sign_in": "Iniciar Sesión",
      "sign_out": "Cerrar Sesión"
    },
    skills: {
      "title": "Intercambio de Habilidades",
      "description": "Comparte conocimiento, aprende de otros y construye capacidad comunitaria",
      "project_showcase": "Escaparate de Proyectos",
      "knowledge_base": "Base de Conocimiento",
      "skill_marketplace": "Mercado de Habilidades",
      "learning_courses": "Cursos de Aprendizaje",
      "all_projects": "Todos los Proyectos",
      "my_projects": "Mis Proyectos",
      "share_project": "Compartir Proyecto",
      "all_articles": "Todos los Artículos",
      "my_articles": "Mis Artículos",
      "write_article": "Escribir Artículo",
      "offer_skill": "Ofrecer una Habilidad",
      "create_course": "Crear Curso"
    }
  },
  ar: {
    common: {
      "welcome": "مرحبا بكم في Solidarity Web Weave",
      "language": "اللغة",
      "loading": "جاري التحميل...",
      "error": "خطأ",
      "success": "نجح",
      "cancel": "إلغاء",
      "save": "حفظ",
      "edit": "تحرير",
      "delete": "حذف",
      "search": "بحث",
      "filter": "تصفية",
      "all": "الكل",
      "create": "إنشاء",
      "close": "إغلاق"
    },
    navigation: {
      "home": "الرئيسية",
      "dashboard": "لوحة التحكم",
      "food_security": "الأمن الغذائي",
      "energy_democracy": "ديمقراطية الطاقة",
      "mutual_aid": "المساعدة المتبادلة",
      "tool_library": "مكتبة الأدوات",
      "community_garden": "حديقة المجتمع",
      "community_wealth": "ثروة المجتمع",
      "childcare_coop": "تعاونية رعاية الأطفال",
      "elder_care": "رعاية المسنين",
      "disaster_prep": "الاستعداد للكوارث",
      "skills": "تبادل المهارات",
      "organizing": "التنظيم",
      "security": "الأمن",
      "sovereignty": "السيادة",
      "defense": "الدفاع",
      "profile": "الملف الشخصي",
      "settings": "الإعدادات",
      "sign_in": "تسجيل الدخول",
      "sign_out": "تسجيل الخروج"
    },
    skills: {
      "title": "تبادل المهارات",
      "description": "شارك المعرفة، تعلم من الآخرين، وابن قدرة المجتمع",
      "project_showcase": "عرض المشاريع",
      "knowledge_base": "قاعدة المعرفة",
      "skill_marketplace": "سوق المهارات",
      "learning_courses": "دورات التعلم",
      "all_projects": "جميع المشاريع",
      "my_projects": "مشاريعي",
      "share_project": "مشاركة مشروع",
      "all_articles": "جميع المقالات",
      "my_articles": "مقالاتي",
      "write_article": "كتابة مقال",
      "offer_skill": "عرض مهارة",
      "create_course": "إنشاء دورة"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferred-language'
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    }
  });

export default i18n;
