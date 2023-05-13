import React from "react";

import { Post } from "../components/Post";

export const FullPost = () => {
  return (
    <>
      <Post
        id={1}
        title="Petrecere de Craciun"
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={{
          avatarUrl:
            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
          fullName: "Ana",
        }}
        createdAt={"25 decembrie 2022."}
        viewsCount={150}
        commentsCount={3}
        isFullPost
      >
      </Post>
    </>
  );
};