const SERVER_URI = "https://kape-backend.onrender.com/api";

// Function to retrieve the token from local storage
const getToken = () => localStorage.getItem("token"); // Adjust based on your token storage method

export const getManagers = async () => {
    const token = getToken(); // Retrieve the token

    try {
        const response = await fetch(`${SERVER_URI}/get/managers`, {
            method: "GET", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Specify the content type
                ...(token ? { jwt_token: token } : {}), // Conditionally add the token if it exists
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const managers = await response.json(); // Parse the JSON response
        return managers; // Return the list of managers
    } catch (error) {
        console.error("Error fetching managers:", error);
        throw error; // Propagate the error for further handling if needed
    }
};

export const addManager = async (managerData: any) => {
    const token = getToken(); // Retrieve the token

    try {
        const response = await fetch(`${SERVER_URI}/add/manager`, {
            method: "POST", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Specify the content type
                ...(token ? { jwt_token: token } : {}), // Conditionally add the token if it exists
            },
            body: JSON.stringify(managerData), // Convert managerData to JSON
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const newManager = await response.json(); // Parse the JSON response
        console.log(newManager);
        return newManager; // Return the added manager details
    } catch (error) {
        console.error("Error adding manager:", error);
        throw error; // Propagate the error for further handling if needed
    }
};

export const updateManager = async (
    userId: string,
    updatedData: Record<string, any>
) => {
    try {
        const token = getToken(); // Retrieve the token

        const response = await fetch(`${SERVER_URI}/update/manager/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { jwt_token: token } : {}), // Conditionally add the token if it exists
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }

        const result = await response.json();
        return result; // Return the response data
    } catch (error) {
        console.error("Failed to update manager:", error);
        throw error; // Re-throw the error for the component to handle
    }
};

export const deleteManager = async (managerId: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${SERVER_URI}/delete/manager/${managerId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { jwt_token: token } : {}), // Conditionally add the token if it exists
                },
            }
        );
        if (!response.ok) {
            throw new Error("Failed to delete manager");
        }
        return response.json(); // return parsed JSON if needed
    } catch (error) {
        console.error("Error deleting manager:", error);
        throw error;
    }
};
