export const SocialLink = ({ icon: Icon, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group"
  >
    <Icon size={32} className={color} />
  </a>
);
