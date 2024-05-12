const BASE_URL = "https://bootcamp-api.codeit.kr";
const BASE_URL2 = "https://bootcamp-api.codeit.kr/api/linkbrary/v1";

//로그인에 필요한 api 함수
export async function getUser() {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${BASE_URL2}/users`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("유저 정보를 불러올 수 없습니다.");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error("유저 정보를 불러올 수 없습니다.");
  }
}

//폴더 소유자의 정보를 얻기위한 api함수
export async function getFolderUser(userId: number) {
  const response = await fetch(`${BASE_URL2}/users/${userId}`);
  if (!response.ok) {
    throw new Error("폴더 정보를 불러올 수 없습니다.");
  }
  const folderUser = await response.json();
  return folderUser;
}

//폴더의 정보를 얻기위한 api함수
export async function getFolder(id: any) {
  const response = await fetch(`${BASE_URL2}/folders/${id}`);
  if (!response.ok) {
    throw new Error("폴더 정보를 불러올 수 없습니다.");
  }
  const folder = await response.json();
  return folder;
}

//현재 폴더 목록들을 얻기위한 api함수
export async function getFolderList() {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL2}/folders`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("폴더 목록을 불러올 수 없습니다..");
    }

    const folderList = await response.json();
    return folderList;
  } catch (error) {
    throw new Error("폴더 목록을 불러올 수 없습니다..");
  }
}

//전체 폴더의 링크 데이터를 얻기위한 api함수
export async function getAllLinks() {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(`${BASE_URL2}/links`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("전체 폴더 링크를 불러오는데 실패했습니다");
    }

    const allLinks = await response.json();
    return allLinks;
  } catch (error) {
    throw new Error("전체 폴더 링크를 불러오는데 실패했습니다");
  }
}

//개별 폴더의 링크 데이터를 얻기위한 api함수
export async function getFolderLink(id: number) {
  const response = await fetch(`${BASE_URL2}/folders/${id}/links`);
  if (!response.ok) {
    throw new Error("해당 폴더 링크를 불러오는데 실패했습니다");
  }
  const folderLink = await response.json();
  return folderLink;
}

export async function postSignIn(id: string, password: string) {
  const response = await fetch(`${BASE_URL2}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: id,
      password: password,
    }),
  });

  return response;
}

export async function postCheckEmail(id: string) {
  const response = await fetch(`${BASE_URL2}/users/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: id,
    }),
  });

  return response;
}

export async function postSignUp(id: string, password: string) {
  const response = await fetch(`${BASE_URL2}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: id,
      password: password,
    }),
  });

  return response;
}
