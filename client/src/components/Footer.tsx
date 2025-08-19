const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* Logo and description */}
        <div>
          <h1 className="text-xl uppercase tracking-wider font-bold">
            Portora
          </h1>
          <p className="mt-4 text-sm">
            Streamline your client communication, file sharing, and feedback all
            in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/features" className="hover:text-emerald-600">
                Features
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-emerald-600">
                Pricing
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-emerald-600">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-emerald-600">
                Get Started
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/faq" className="hover:text-emerald-600">
                FAQ
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-emerald-600">
                Support
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-emerald-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-emerald-600">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Stay Updated</h3>
          <p className="text-sm mb-3">Get occasional updates & news.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="px-3 py-2 border rounded-md w-full sm:w-auto"
            />
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-200 text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Portora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
