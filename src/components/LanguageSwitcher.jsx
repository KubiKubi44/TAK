import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const currentLang = i18n.language;
        const newLang = currentLang.startsWith('cs') ? 'en' : 'cs';
        i18n.changeLanguage(newLang);
    };

    const isCs = (i18n.language || 'cs').startsWith('cs');
    const isEn = (i18n.language || 'cs').startsWith('en');

    return (
        <button
            onClick={toggleLanguage}
            className="group flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
        >
            <span className={isCs ? 'text-neon-cyan drop-shadow-[0_0_5px_rgba(4,255,247,0.5)]' : 'group-hover:text-neon-cyan transition-colors'}>CS</span>
            <span className="text-white/30">/</span>
            <span className={isEn ? 'text-neon-magenta drop-shadow-[0_0_5px_rgba(247,4,255,0.5)]' : 'group-hover:text-neon-magenta transition-colors'}>EN</span>
        </button>
    );
};

export default LanguageSwitcher;
