import React from 'react';

import './Post.css';

const Post = () => {
  return (
    <div className='post'>
      <img style={{width: '40px', borderRadius: '10px'}} src="https://avatars.mds.yandex.net/get-zen_doc/3584238/pub_606359520bfe8b31336b27cd_606359c80da33337475d617d/scale_1200" alt="" />
      post 1
      <div>
        <span>like</span>
      </div>
    </div>
  );
}

export default Post;