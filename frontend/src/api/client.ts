const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Для работы с cookies
      ...options,
    };

    try {
      const response = await fetch(url, config);
      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      return {
        data: response.ok ? data : undefined,
        error: !response.ok ? (data?.detail || 'Произошла ошибка') : undefined,
        status: response.status,
      };
    } catch (error) {
      return {
        error: 'Ошибка сети',
        status: 0,
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/accounts/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, username: string, password: string, role: string) {
    return this.request('/accounts/register/', {
      method: 'POST',
      body: JSON.stringify({ email, username, password, role }),
    });
  }

  async confirmCode(email: string, code: string) {
    return this.request('/accounts/confirm_code/', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  async logout() {
    return this.request('/accounts/logout/', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request('/accounts/refresh/', {
      method: 'POST',
    });
  }

  // Profile endpoints
  async getMyProfile() {
    return this.request<{
      id: number;
      email: string;
      username: string;
      role: string;
      email_verified: boolean;
    }>('/profiles/me/');
  }

  async getTrainerProfile(username: string) {
    return this.request(`/profiles/trainer/${username}/`);
  }

  async getAthleteProfile(username: string) {
    return this.request(`/profiles/athlete/${username}/`);
  }

  async getParentProfile(username: string) {
    return this.request(`/profiles/parent/${username}/`);
  }

  async getChildrenProfile(username: string) {
    return this.request(`/profiles/children/${username}/`);
  }

  async editTrainerProfile(data: Record<string, unknown>) {
    return this.request('/profiles/trainer/edit-my-profile/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async editAthleteProfile(data: Record<string, unknown>) {
    return this.request('/profiles/athlete/edit-my-profile/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async editParentProfile(data: Record<string, unknown>) {
    return this.request('/profiles/parent/edit-my-profile/', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async editChildrenProfile(username: string, data: Record<string, unknown>) {
    return this.request(`/profiles/children/${username}/edit/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Schedule endpoints
  async createGroupTrainingSession(data: Record<string, unknown>) {
    return this.request('/schedules/create/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async editGroupTrainingSession(sessionId: number, data: Record<string, unknown>) {
    return this.request(`/schedules/${sessionId}/edit/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async cancelGroupTrainingSession(sessionId: number) {
    return this.request(`/schedules/${sessionId}/cancel/`, {
      method: 'POST',
    });
  }

  async finishGroupTrainingSession(sessionId: number) {
    return this.request(`/schedules/${sessionId}/finish/`, {
      method: 'POST',
    });
  }

  async createIndividualTrainingSession(data: Record<string, unknown>) {
    return this.request('/schedules/individual/create/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async editIndividualTrainingSession(sessionId: number, data: Record<string, unknown>) {
    return this.request(`/schedules/individual/${sessionId}/edit/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async cancelIndividualTrainingSession(sessionId: number) {
    return this.request(`/schedules/individual/${sessionId}/cancel/`, {
      method: 'POST',
    });
  }

  async finishIndividualTrainingSession(sessionId: number) {
    return this.request(`/schedules/individual/${sessionId}/finish/`, {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL); 