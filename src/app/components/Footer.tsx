import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">Statify</h3>
            <p className="text-sm text-muted-foreground">
              Discover your music listening patterns with beautiful analytics and insights. Track your favorite artists, songs, and genres.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex items-end">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Statify. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
