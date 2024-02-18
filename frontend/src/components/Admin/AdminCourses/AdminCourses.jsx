import React from 'react'

const AdminCourses = () => {
  return (
    <Grid
    css={{
      cursor: `url(${cursor}), default`,
    }}
    minH={'100vh'}
    templateColumns={['1fr', '5fr 1fr']}
  >
    <Box p={['0', '8']} overflowX="auto">
      <Heading
        textTransform={'uppercase'}
        children="All Courses"
        my="16"
        textAlign={['center', 'left']}
      />

      <TableContainer w={['100vw', 'full']}>
        <Table variant={'simple'} size="lg">
          <TableCaption>All available courses in the database</TableCaption>

          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Poster</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Creator</Th>
              <Th isNumeric>Views</Th>
              <Th isNumeric>Lectures</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses.map(item => (
              <Row
                coureDetailsHandler={coureDetailsHandler}
                deleteButtonHandler={deleteButtonHandler}
                key={item._id}
                item={item}
                loading={loading}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <CourseModal
        isOpen={isOpen}
        onClose={onClose}
        id={courseId}
        courseTitle={courseTitle}
        deleteButtonHandler={deleteLectureButtonHandler}
        addLectureHandler={addLectureHandler}
        lectures={lectures}
        loading={loading}
      />
    </Box>

    <Sidebar />
  </Grid>
  )
}

export default AdminCourses