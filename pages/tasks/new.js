import { useState, useEffect, React } from "react";
import { useRouter } from "next/router";
import { Button, Grid, Form, Loader } from "semantic-ui-react";
import { Input } from "semantic-ui-react";

const CreateTask = () => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const { title, description } = newTask;
  const { push, query } = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  //  get single data for edit and this data is showd in the edit form start
  const getTask = async () => {
    const response = await fetch(
      `https://task-app-nextjs.herokuapp.com/api/tasks/${query.id}`
    );
    const data = await response.json();
    setNewTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (query.id) getTask();
  }, [query.id]);

  //  get single data for edit and this data is showd in the edit form end

  // for form validation start
  // const validate = () => {
  //   let errors = {};
  //   if (!title) {
  //     errors.title = "Title is required";
  //   }
  //   if (!description) {
  //     errors.description = "Description is required";
  //   }
  //   return errors;
  // };
  // for form validation end

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("hi next");

    // use form validate function in submit handler start
    // let errors = validate();
    // if (Object.keys(errors).length) {
    //   return setErrors(errors);
    //   setIsSubmit(true);
    //   await taskCreate();
    //   await push("/");
    // }

    setIsSubmit(true);

    if (query.id) {
      await updateTask();
    } else {
      await taskCreate();
    }

    await push("/");

    // post data to the database
    // try {
    //   await fetch("http://localhost:3000/api/tasks", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newTask),
    //   });
    //   setIsSubmit(true);
    //   await push("/");
    // } catch (err) {
    //   setErrors(err.message);
    // }
  };

  const updateTask = async () => {
    try {
      await fetch(
        `https://task-app-nextjs.herokuapp.com/api/tasks/${query.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const taskCreate = async () => {
    try {
      await fetch("https://task-app-nextjs.herokuapp.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  return (
    <div>
      <Grid
        centered
        verticalAlign="middle"
        columns={3}
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <div>
              <h1>{query.id ? "Update Task" : "Create Task"}</h1>
              <div>
                {isSubmit ? (
                  <Loader active inline="center" />
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Input
                      // error={
                      //   errors.title
                      //     ? { content: "Please Enter a Title" }
                      //     : null
                      // }
                      label="Title"
                      placeholder="Enter Title"
                      name="title"
                      onChange={handleChange}
                      value={title}
                      autoFocus
                    />

                    <Form.TextArea
                      // error={
                      //   errors.description
                      //     ? { content: "Please Enter a Description" }
                      //     : null
                      // }
                      label="Description"
                      placeholder="Enter Description"
                      name="description"
                      onChange={handleChange}
                      value={description}
                    />
                    <Button type="submit" primary>
                      Submit
                    </Button>
                  </Form>
                )}
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CreateTask;
