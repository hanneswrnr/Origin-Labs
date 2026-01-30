import { NextResponse } from "next/server";

// Cache duration: 4 days in seconds (345600 seconds)
const REVALIDATE_SECONDS = 4 * 24 * 60 * 60;

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description: string;
}

interface PlaceDetailsResponse {
  result?: {
    reviews?: GoogleReview[];
    rating?: number;
    user_ratings_total?: number;
  };
  status: string;
}

export async function GET() {
  const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (!GOOGLE_API_KEY || !PLACE_ID) {
    console.error("Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID");
    return NextResponse.json(
      { error: "API configuration missing" },
      { status: 500 }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}&language=de`;

    // Next.js caches this fetch for 4 days automatically
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    const data: PlaceDetailsResponse = await response.json();

    if (data.status !== "OK" || !data.result) {
      console.error("Google API Error:", data.status);
      return NextResponse.json(
        { error: "Failed to fetch reviews", status: data.status },
        { status: 500 }
      );
    }

    const reviews = data.result.reviews || [];
    const rating = data.result.rating || 0;
    const total = data.result.user_ratings_total || 0;

    return NextResponse.json({ reviews, rating, total });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// Also cache the API route response itself (4 days = 345600 seconds)
export const revalidate = 345600;
