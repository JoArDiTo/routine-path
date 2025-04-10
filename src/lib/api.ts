import { getTokenFromCookie } from "@lib/service";

interface RegisterUserRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export async function register(registerUserRequest: RegisterUserRequest) {
  const { firstname, lastname, email, password } = registerUserRequest
  
  try {
    const response = await fetch("http://localhost:4001/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }), 
    });

    const data = await response.json();

    if (!response.ok) return data.error

    return data;

  } catch (error) {
    console.error("Error during registration:", error);
  }
}


export async function login(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:4001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) return data.error

    return data

  } catch (error) {
    console.error("Error during login:", error);
  }
}

export async function getProfile() {
  try {
    const response = await fetch("http://localhost:4001/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getTokenFromCookie()
      },
    });

    const data = await response.json();

    if (!response.ok) return data.error

    return data

  } catch (error) {
    console.error("Error during getProfile:", error);
  }
}
