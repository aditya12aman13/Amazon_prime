export default function Footer() {
  return (
    <footer className="bg-prime-nav border-t border-gray-800 py-12 px-8 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-lg font-bold mb-4 tracking-wider text-gray-300">prime video</h3>
        <div className="flex justify-center gap-6 mb-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">Privacy Notice</a>
          <a href="#" className="hover:text-white">Help</a>
          <a href="#" className="hover:text-white">Cookie Preferences</a>
        </div>
        <p className="text-xs text-gray-600">&copy; 2024 Amazon.com, Inc. or its affiliates. All rights reserved.</p>
      </div>
    </footer>
  );
}
