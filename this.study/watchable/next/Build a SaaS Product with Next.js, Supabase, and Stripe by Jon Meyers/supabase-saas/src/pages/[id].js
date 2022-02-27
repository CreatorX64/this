import { useState, useEffect } from "react";
import Video from "react-player";
import { supabase } from "../utils/supabase";

export async function getStaticPaths() {
  const { data: lessons } = await supabase.from("lessons").select("id");

  const paths = lessons.map(({ id }) => ({
    params: {
      id: id.toString()
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { id } }) {
  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      lesson
    }
  };
}

export default function LessonDetailsPage({ lesson }) {
  const [videoUrl, setVideoUrl] = useState();

  async function getPremiumContent() {
    const { data } = await supabase
      .from("premium_content")
      .select("video_url")
      .eq("id", lesson.id)
      .single();

    setVideoUrl(data?.video_url);
  }

  useEffect(() => {
    getPremiumContent();
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">{lesson.title}</h1>
      <p className="mb-8">{lesson.description}</p>
      {videoUrl && <Video url={videoUrl} width="100%" />}
    </div>
  );
}
