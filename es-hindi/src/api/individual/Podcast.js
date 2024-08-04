import { getArticleList } from "api/global/Common";

export const calculateDate = (date) => {
  const year = date ? date.slice(0, 4) : "";
  const months = date ? date.slice(5, 7) : "";
  const monthInt = parseInt(months);
  const month = monthInt < 10 ? months.charAt(1) : months;
  const days = date ? date.slice(8, 10) : "";
  const dayInt = parseInt(days);
  const day = dayInt < 10 ? days.charAt(1) : days;
  const Time = date ? date.slice(11, 19) : "";
  const display = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(Time.slice(0, 2)),
    parseInt(Time.slice(3, 5)),
    parseInt(Time.slice(6, 8))
  );
  return display;
};

const fields =
  "story_id,display_headline,post_type,categories,weburl_r,weburl,thumbnail,content_type,podcast_category,images,insert_date,updated_at,created_at,podcast_embed,audio_id,audio_size,audio_duration,intro,slug";

export const podcastDataDetails = async (data) => {
  const limit = 5;
  const offset = 0;
  const podcastData = await Promise.all(
    data.map(async (element) => {
      const podcastStoriesData = await getArticleList({
        offset,
        count: limit,
        filter: {
          podcast_category: element.ID || 0,
          post_type: "podcast",
        },
        fields: fields,
      });
      if (podcastStoriesData) {
        return {
          order: element.prodcast_order,
          podcast: podcastStoriesData,
          element,
        };
      }
    })
  );
  return podcastData;
};

export const latestPodcastDataRes = async (offset = 0, limit = 5) => {
  const podcastStoriesData = await getArticleList({
    offset,
    count: limit,
    filter: { post_type: "podcast" },
    fields: fields,
  });

  return podcastStoriesData;
};

export const getDataWithCategoryId = async (
  categoryId,
  offset = 0,
  limit = 10
) => {
  const podcastStoriesData = await getArticleList({
    offset,
    count: limit,
    filter: categoryId
      ? { post_type: "podcast", podcast_category: categoryId }
      : { post_type: "podcast" },
    fields: fields,
  });
  return podcastStoriesData || [];
};

