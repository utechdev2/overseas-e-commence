import Image from "next/image";
import { story } from "@/lib/store";

export default function OurStoryPage() {
  return <main className="page-shell story-page">
    <section className="page-heading"><p className="eyebrow">THE FOREIGN BOYS CLAN</p><h1>OUR STORY</h1><p>{story.intro}</p></section>
    <div className="story-feature"><Image src={story.image} alt="OVERSEAS community" fill sizes="100vw" /></div>
    <section className="story-long"><p>{story.body}</p><p>{story.bodyTwo}</p><div className="manifesto"><b>GLOBAL INFLUENCE.</b><b>GHANAIAN IDENTITY.</b><b>LASTING IMPACT.</b></div></section>
  </main>;
}
