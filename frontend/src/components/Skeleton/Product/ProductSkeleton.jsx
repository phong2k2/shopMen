import { Box, Grid, Paper, Skeleton } from "@mui/material"
import styles from "./styles"

function ProductSkeleton() {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper sx={styles.paper}>
            <Box sx={styles.boxImg}>
              <Skeleton
                sx={styles.skeletonImg}
                animation="wave"
                variant="rectangular"
              />
            </Box>
            <Box sx={styles.wrapContent}>
              <Box>
                <Skeleton variant="text" width="90%" />
              </Box>
              <Box sx={styles.wrapProductPrice}>
                <Skeleton variant="text" width="20%" height={30} />
                <Skeleton variant="text" width="40%" height={30} />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={styles.paper}>
            <Box sx={styles.boxImg}>
              <Skeleton
                sx={styles.skeletonImg}
                animation="wave"
                variant="rectangular"
              />
            </Box>
            <Box sx={styles.wrapContent}>
              <Box>
                <Skeleton variant="text" width="90%" />
              </Box>
              <Box sx={styles.wrapProductPrice}>
                <Skeleton variant="text" width="20%" height={30} />
                <Skeleton variant="text" width="40%" height={30} />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={styles.paper}>
            <Box sx={styles.boxImg}>
              <Skeleton
                sx={styles.skeletonImg}
                animation="wave"
                variant="rectangular"
              />
            </Box>
            <Box sx={styles.wrapContent}>
              <Box>
                <Skeleton variant="text" width="90%" />
              </Box>
              <Box sx={styles.wrapProductPrice}>
                <Skeleton variant="text" width="20%" height={30} />
                <Skeleton variant="text" width="40%" height={30} />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={styles.paper}>
            <Box sx={styles.boxImg}>
              <Skeleton
                sx={styles.skeletonImg}
                animation="wave"
                variant="rectangular"
              />
            </Box>
            <Box sx={styles.wrapContent}>
              <Box>
                <Skeleton variant="text" width="90%" />
              </Box>
              <Box sx={styles.wrapProductPrice}>
                <Skeleton variant="text" width="20%" height={30} />
                <Skeleton variant="text" width="40%" height={30} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductSkeleton
