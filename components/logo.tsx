import { Github } from "lucide-react";

export default function Logo() {
  return (
    <a
      href="https://github.com/Frisbiz"
      className="flex items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-300/30">
        <Github className="h-5 w-5 text-white" />
      </div>
    </a>
  );
}
