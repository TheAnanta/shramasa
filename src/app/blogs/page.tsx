import { redirect } from "next/navigation";

async function navigation() {
  redirect("/blogs/blog1");
}

export default function Page() {
  return (
    <div className="grid grid-cols-3 px-28 py-14 gap-4">
      {[
        {
          id: "blog1",
          image:
            "https://theindustry.beauty/wp-content/uploads/2024/03/Rare-Beauty1.jpg",
          title: "Lorem ipsum dolor",
          date: "12th Ocotober 2024",
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                unde nulla quam ipsum! Saepe, vero. Quisquam sapiente, sint
                fugit reprehenderit rem aut praesentium obcaecati cumque quasi
                at. Dicta, ad est!`,
        },
        {
          id: "blog2",
          image:
            "https://cdn.logojoy.com/wp-content/uploads/20191023114758/AdobeStock_224061283-min.jpeg",
          title: "Lorem ipsum dolor",
          date: "10th Ocotober 2024",
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                unde nulla quam ipsum! Saepe, vero. Quisquam sapiente, sint
                fugit reprehenderit rem aut praesentium obcaecati cumque quasi
                at. Dicta, ad est!`,
        },
        {
          id: "blog3",
          image:
            "https://img.freepik.com/premium-photo/purity-radiance-indian-beauty-influencer-s-endorsement-organic-skincare_878783-12061.jpg",
          title: "Lorem ipsum dolor",
          date: "20th September 2024",
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                unde nulla quam ipsum! Saepe, vero. Quisquam sapiente, sint
                fugit reprehenderit rem aut praesentium obcaecati cumque quasi
                at. Dicta, ad est!`,
        },
      ].map((blog) => {
        return (
          <div key={blog.title} className="border overflow-hidden rounded-xl">
            <img src={blog.image} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold">{blog.title}</h2>
              <p className="mb-2 text-sm font-medium opacity-60">{blog.date}</p>
              <p className="text-sm opacity-60 mb-2">{blog.description}</p>
              <a
                href={`/blogs/` + blog.id}
                className="text-sm uppercase font-bold text-[#46a625]"
              >
                Read more..
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
