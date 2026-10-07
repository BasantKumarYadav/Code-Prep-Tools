import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>CodePrepTools</h2>

          <p>
            Simple and useful developer tools and interview
            preparation resources.
          </p>
        </div>

        <div>
          <h3>Tools</h3>

          <Link href="/developer-tools">
            Developer Tools
          </Link>

          <Link href="/tools/json-formatter">
            JSON Formatter
          </Link>
        </div>

        <div>
          <h3>Company</h3>

          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div>
          <h3>Legal</h3>

          <Link href="/privacy-policy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms of Service
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © 2026 CodePrepTools. All rights reserved.
        </p>
        <p>Developed By Basant Kumar Yadav</p>
      </div>
    </footer>
  );
}
