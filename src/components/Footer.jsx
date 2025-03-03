const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-4 mt-10 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-6">
          {/* Made by */}
          <p className="text-sm text-center sm:text-left">
            Made with ❤️ by <span className="text-blue-400 font-semibold">Anuj</span>
          </p>
  
          {/* Social Links */}
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  