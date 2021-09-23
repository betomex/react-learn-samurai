import React from 'react';

import './Post.css';

type propsType = {
  message: string
  likesCount: number
}

const Post: React.FC<propsType> = (props) => {
  return (
    <div className='post'>
      <img style={{width: '40px', borderRadius: '10px'}} src="https://avatars.mds.yandex.net/get-zen_doc/3584238/pub_606359520bfe8b31336b27cd_606359c80da33337475d617d/scale_1200" alt="" />
      {props.message}
      <div>
        <span>likes: {props.likesCount}</span>
      </div>
    </div>
  );
}

export default Post;