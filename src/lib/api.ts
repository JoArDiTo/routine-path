import { getTokenFromCookie } from "@lib/service";
import { RegisterUserRequest, GoalWithStepsRequest } from "@interfaces/request";

const API = 'http://localhost:4001/api';

export async function register(registerUserRequest: RegisterUserRequest) {
  const { firstname, lastname, email, password } = registerUserRequest;
  
  try {
    const response = await fetch(`${API}/users/register`, {
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
    throw error
  }
}


export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API}/users/login`, {
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
    throw error
  }
}

export async function getProfile() {
  const token = getTokenFromCookie()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    });

    const data = await response.json();

    if (!response.ok) return data.error

    return data

  } catch (error) {
    throw error
  }
}

export async function getGoalsByUserLogged(){
  const token = getTokenFromCookie()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API}/goals/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })

    const data = await response.json();

    if (!response.ok) throw new Error(data.error)

    return data

  } catch (error) {
    throw error
  }

}

export async function getStepsGoalById(goalId: string){
  const token = getTokenFromCookie()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API}/steps/list/${goalId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })

    const data = await response.json();

    if (!response.ok) throw new Error(data.error)

    return data
  } catch (error) {
    throw error 
  }
}

export async function createGoal(goalWithStepsRequest: GoalWithStepsRequest) {
  const token = getTokenFromCookie()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")
  
  const { title, description, deadline, steps = [] } = goalWithStepsRequest;

  try {
    const response = await fetch(`${API}/goals/register-with-steps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ title, description, deadline, steps }),
    })

    const data = await response.json();

    if (!response.ok) throw new Error(data.error)

    return data
  } catch (error) {
    throw error 
  }
}

export async function updateStepsGoal(goalId: string, steps: {id: string, is_completed: boolean }[]) {
  const token = getTokenFromCookie()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API}/steps/update/group/${goalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ steps }),
    })

    const data = await response.json();

    if (!response.ok) throw new Error(data.error)

    return data
  } catch (error) {
    throw error 
  }
}

export async function updateGoalData(goalId: string, status: string) {
  const token = getTokenFromCookie()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")
  console.log({ status })
  try {
    const response = await fetch(`${API}/goals/update/${goalId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ status }),
    })

    const data = await response.json();
    console.log(data)

    if (!response.ok) throw new Error(data.error)

    return data
  } catch (error) {
    throw error 
  }
}