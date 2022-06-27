// * react
import React from "react";

// * styles/MUI
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import "../styles/modules/post/index.css";

export default function PostSkeleton() {
  return (
    <div className='skeleton'>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <div className='skeletonContent'>
          <div className='skeletonUser'>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              style={{ marginRight: 10 }}
            />
            <div className='skeletonUserDetails'>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </div>
          </div>
          <div className='skeletonInfo'>
            <Skeleton variant="text" width="80%" height={45} />
            <div className='skeletonTags'>
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};
