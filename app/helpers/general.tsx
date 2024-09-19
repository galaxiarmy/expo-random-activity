export interface Data {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: 0.3;
}

export const getDataActivity = async () => {
  try {
    const response = await fetch("https://bored.api.lewagon.com/api/activity");
    const jsonData: Data = await response.json();

    if (response.status === 200) {
      return jsonData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
