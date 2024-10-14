import { Box, Skeleton } from "@mui/material"
import styles from "./styles"

function Loading() {
  return (
    <Box sx={styles.wrapperSkeleton}>
      <Box sx={styles.wrapperSkeletonLeft}>
        <Box sx={styles.slideVertical}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width="60%"
            height="80px"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width="60%"
            height="80px"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width="60%"
            height="80px"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width="60%"
            height="80px"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width="60%"
            height="80px"
          />
        </Box>

        <Box sx={styles.slideHorizontal}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width="90%"
            height="100%"
          />
        </Box>
      </Box>
      <Box sx={styles.wrapperSkeletonRight}>
        <Skeleton
          sx={{ marginBottom: "10px" }}
          animation="wave"
          width="80%"
          height="25px"
        />
        <Skeleton
          sx={{ marginBottom: "4px" }}
          animation="wave"
          width="60%"
          height="25px"
        />
        <Skeleton
          sx={{ marginBottom: "10px" }}
          animation="wave"
          width="40%"
          height="25px"
        />

        <Box sx={styles.wrapperAttribute}>
          <Skeleton animation="wave" width="50px" height="70px" />

          <Skeleton animation="wave" width="50px" height="70px" />

          <Skeleton animation="wave" width="50px" height="70px" />
          <Skeleton animation="wave" width="50px" height="70px" />
        </Box>

        <Box sx={styles.wrapperAttribute}>
          <Skeleton animation="wave" width="50px" height="70px" />

          <Skeleton animation="wave" width="50px" height="70px" />

          <Skeleton animation="wave" width="50px" height="70px" />
          <Skeleton animation="wave" width="50px" height="70px" />
        </Box>

        <Box sx={styles.wrapperBtn}>
          <Skeleton animation="wave" width="50%" height="80px" />
          <Skeleton animation="wave" width="50%" height="80px" />
        </Box>

        <Box sx={styles.wrapperText}>
          <Skeleton animation="wave" width="100%" height="40px" />
          <Skeleton animation="wave" width="100%" height="40px" />
        </Box>
      </Box>
    </Box>
  )
}

export default Loading
