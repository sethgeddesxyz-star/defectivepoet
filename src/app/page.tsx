import { bio, bioSecondParagraph, aboutThisSite } from "@/data/siteContent";

export default function HomePage() {
  return (
    <div className="page-container py-10">
      <div className="bg-memorial-surface/5 border border-gold-900/20 rounded-xl p-6 sm:p-10 gold-glow">
        <div className="sm:float-left sm:mr-8 sm:mb-4 flex justify-center sm:block mb-6 animate-fade-in-up">
          <img
            src="/images/photo.jpg"
            alt="Christian Zachary Geddes"
            className="w-56 h-auto rounded-lg border-2 border-gold-800/30 shadow-lg"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading gold-gradient-text mb-6 animate-fade-in-up">
          Christian Zachary Geddes
        </h1>

        <p className="text-gold-200 leading-relaxed mb-6 animate-fade-in-up-delayed">{bio}</p>
        <p className="text-gold-200 leading-relaxed mb-8 animate-fade-in-up-delayed-2">
          {bioSecondParagraph}
        </p>

        <div className="clear-both" />

        <div className="pt-8 mt-8 animate-fade-in-up-delayed-3">
          <hr className="gold-divider mb-8" />
          <h2 className="text-2xl font-heading text-gold-400 mb-4">
            About This Site
          </h2>
          <p className="text-gold-200 leading-relaxed">{aboutThisSite}</p>
        </div>
      </div>
    </div>
  );
}
