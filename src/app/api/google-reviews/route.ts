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

// New Places API response structure
interface PlaceDetailsResponseNew {
  reviews?: Array<{
    authorAttribution: {
      displayName: string;
      photoUri?: string;
    };
    rating: number;
    text: {
      text: string;
    };
    relativePublishTimeDescription: string;
    publishTime: string;
  }>;
  rating?: number;
  userRatingCount?: number;
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
    // New Places API endpoint
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=de`;

    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google API Error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch reviews", status: response.status },
        { status: 500 }
      );
    }

    const data: PlaceDetailsResponseNew = await response.json();

    // Transform to our expected format
    const reviews: GoogleReview[] = (data.reviews || []).map((review) => ({
      author_name: review.authorAttribution.displayName,
      rating: review.rating,
      text: review.text.text,
      time: new Date(review.publishTime).getTime(),
      profile_photo_url: review.authorAttribution.photoUri,
      relative_time_description: review.relativePublishTimeDescription,
    }));

    const rating = data.rating || 0;
    const total = data.userRatingCount || 0;

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
