import { FC } from "react";
import Image from "next/image";
import { BlogType } from "@/interfaces";
import { useRouter } from "next/router";

interface BlogCardProps {
  data: BlogType;
}

const BlogCard: FC<BlogCardProps> = ({ data }) => {
  const router = useRouter();
  const category = data?._embedded?.["wp:term"]?.[0]?.[0];

  console.log(category);

  return (
    <div
      onClick={() => router.push(`/blog/${data?.slug}`)}
      className="flex flex-col p-[24px] bg-[#F5F5F5] gap-[24px] md:gap-[36px] rounded-[10px] cursor-pointer"
    >
      <div className="relative">
        <Image
          width={447}
          height={184}
          src={data?._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
          alt=""
          className="rounded-[10px] w-full h-[184px] object-cover bg-slate-200"
        />
        {category?.slug !== "uncategorized" && (
          <div
            className="small-2 md:py-[8px] py-[4px] text-white px-[12px] rounded-[10px] bg-[#007BE9] absolute top-[12px] left-[12px] md:top-[16px] md:left-[16px]"
            dangerouslySetInnerHTML={{ __html: category?.name }}
          />
        )}
      </div>
      <div className="flex flex-col gap-[12px] md:gap-[16px]">
        <div
          className="sub-heading-2"
          dangerouslySetInnerHTML={{ __html: data?.title?.rendered }}
        />
        <div className="label">{data?.acf?.description}</div>
      </div>
    </div>
  );
};

export default BlogCard;
