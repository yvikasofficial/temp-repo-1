export interface ProductType {
  name: string;
  slug: string;
  id: string;
  images: ProductImageType[];
  categories: CategoryType[];
  tags: ProductTagType[];
  price: string;
  start_date: string;
  meta_data: MetaDataType[];
  duration: string;
  image: string;
  course_outline: CourseOutlineType[];
  course_start_dates: CourseStartDateTypes[];
  description: string;
  in_person: boolean;
  remote_class: boolean;
  reviews: ReviewType[];
  regular_price: string;
}

export interface ReviewType {
  review: string;
  user: string;
  review_date: string;
}

export interface CourseStartDateTypes {
  date: string;
  start_time: string;
  end_time: string;
}

export interface CourseOutlineType {
  lesson_name: string;
  sub_topics: SubTopicType[];
}

export interface SubTopicType {
  sub_topic_name: string;
  sub_topic_duration: string;
}

export interface MetaDataType {
  id: number;
  key: string;
  value: string;
}

export interface CategoryType {
  name: string;
  slug: string;
  id: string;
  image: ProductImageType;
}
export interface ProductImageType {
  alt: string;
  id: number;
  src: string;
  name: string;
}

export interface ProductTagType {
  name: string;
  id: number;
  slug: string;
}

export interface BlogType {
  acf: {
    description: string;
  };
  content: {
    rendered: string;
  };
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  modified: string;
  _embedded: {
    "wp:featuredmedia": FeaturedMediaType[];
    author: AuthorType[];
    "wp:term": any;
  };
}

export interface FeaturedMediaType {
  id: number;
  alt_text: string;
  source_url: string;
  media_details: {
    sizes: {
      "genesis-block-theme-logo": {
        source_url: string;
      };
    };
  };
  alt: string;
  url: string;
  sizes: {
    "genesis-block-theme-logo": string;
  };
}

export interface AuthorType {
  id: number;
  name: string;
  url: string;
}

export interface AboutPageCardType {
  button: {
    title: string;
    url: string;
  };
  color: string;
  description: string;
  title: string;
}

export interface acfTeamImage {
  position: string;
  image: FeaturedMediaType;
  name: string;
}
export interface AboutPageType {
  acf: {
    hero: {
      description: string;
      title: string;
      image: FeaturedMediaType;
    };
    about: {
      title: string;
      description: string;
    };
    team: {
      description: string;
      members: acfTeamImage[];
      title: string;
    };
    cards: {
      card: AboutPageCardType[];
    };
  };
}

export interface FooterLinkType {
  label: string;
  url: string;
}

export interface FooterType {
  acf: {
    copyright: string;
    new_description: string;
    important_links: FooterLinkType[];
    company: FooterLinkType[];
    product: FooterLinkType[];
    logos: {
      logo: {
        url: string;
      };
    }[];
    social: {
      facebook: string;
      linked_in: string;
      youtube: string;
      twitter: string;
    };
    contact: {
      email: string;
      address: string;
      phone: string;
    };
  };
}
