import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 text-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-black/30 rounded-xl shadow-2xl p-8 sm:p-12 space-y-8 border border-gray-700">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-400 leading-tight mb-4 animate-fade-in-down">
            About Connect100xDevs
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Connecting 100x developers, fostering collaboration, and showcasing
            the future of tech through code.
          </p>
          <div className="w-24 h-1 bg-purple-600 rounded-full mx-auto mt-6 animate-scale-in"></div>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-200 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-base leading-relaxed text-gray-300">
            At Connect100xDevs, our mission is to build the ultimate social
            media platform for developers. We aim to empower coders worldwide by
            providing an intuitive space where they can connect, share their
            work, and collaborate on innovative projects. We believe in the
            power of a strong community to elevate individual skills and
            collective achievements.
          </p>
          <p className="text-base leading-relaxed text-gray-300">
            We strive to break down traditional networking barriers, enabling
            like-minded individuals to find each other, engage in real-time
            conversations, and showcase their development journey, including
            their valuable GitHub contributions.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-200 mt-8 mb-4">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-base leading-relaxed text-gray-300 space-y-2">
            <li>
              <strong className="text-purple-400">Community:</strong> Building a
              supportive and inclusive network for all developers.
            </li>
            <li>
              <strong className="text-purple-400">Innovation:</strong>{" "}
              Encouraging new ideas, collaborative coding, and creative
              problem-solving.
            </li>
            <li>
              <strong className="text-purple-400">Transparency:</strong>{" "}
              Fostering an open environment for sharing code, ideas, and
              feedback.
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-200 mt-8 mb-4">
            What We Offer
          </h2>
          <p className="text-base leading-relaxed text-gray-300">
            Connect100xDevs offers seamless developer profiles where you can
            highlight your expertise, showcase your projects, and integrate your
            GitHub repository graph to visualize your coding activity. Engage in
            real-time chat with other developers, discover exciting
            collaboration opportunities, and build your professional network
            effortlessly.
          </p>
          <p className="text-base leading-relaxed text-gray-300">
            Join us in building a vibrant ecosystem where every developer can
            thrive, connect, and contribute to the future of technology.
          </p>
        </section>

        <footer className="text-center pt-8 border-t border-gray-700 mt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Connect100xDevs. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutUsPage;
