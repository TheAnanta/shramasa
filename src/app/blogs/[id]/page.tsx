export default function BlogArticle({ params }: { params: { id: string } }) {
  const blog = [
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
  ].filter((blog) => blog.id == params.id)[0];
  return (
    <div className="my-8 px-28">
      <img
        className="h-96 rounded-2xl mb-8 w-full object-cover"
        src={blog.image}
      />
      <h2 className="text-4xl font-bold">{blog.title}</h2>
      <p className="text-xl opacity-60 mt-3 mb-8">{blog.date}</p>
      <p className="opacity-50">{blog.description}</p>
      <p className="leading-10 mt-4 opacity-60">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit nam saepe
        atque voluptate autem mollitia, illum ullam obcaecati impedit tempore
        non harum quo quaerat vitae, assumenda soluta quos a dolore?Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Sit nam saepe atque
        voluptate autem mollitia, illum ullam obcaecati impedit tempore non
        harum quo quaerat vitae, assumenda soluta quos a dolore?Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Sit nam saepe atque
        voluptate autem mollitia, illum ullam obcaecati impedit tempore non
        harum quo quaerat vitae, assumenda soluta quos a dolore?Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Sit nam saepe atque
        voluptate autem mollitia, illum ullam obcaecati impedit tempore non
        harum quo quaerat vitae, assumenda soluta quos a dolore?Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Sit nam saepe atque
        voluptate autem mollitia, illum ullam obcaecati impedit tempore non
        harum quo quaerat vitae, assumenda soluta quos a dolore?Lorem ipsum
        dolor sit amet consectetur, adipisicing elit. Sit nam saepe atque
        voluptate autem mollitia, illum ullam obcaecati impedit tempore non
        harum quo quaerat vitae, assumenda soluta quos a dolore?
      </p>
    </div>
  );
}
