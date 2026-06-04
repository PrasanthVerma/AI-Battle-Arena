import axios from "axios";

const baseURL = import.meta.env.VITE_API_URI
  ? `${import.meta.env.VITE_API_URI}/api`
  : "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// ====================
// NORMAL REQUEST
// ====================

const graphArena = async (
  prompt,
  chatId = null
) => {
  try {
    const response =
      await api.post(
        "/use-graph",
        {
          problem: prompt,
          chatId,
        }
      );

    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ====================
// STREAMING REQUEST
// ====================

export const streamArena =
  async (
    prompt,
    file,
    chatId,
    onEvent
  ) => {

    const formData =
      new FormData();

    formData.append(
      "problem",
      prompt
    );

    formData.append(
      "stream",
      "true"
    );

    if (chatId) {
      formData.append(
        "chatId",
        chatId
      );
    }

    if (file) {
      formData.append(
        "file",
        file
      );
    }

    const response =
      await fetch(
        `${baseURL}/use-graph`,
        {
          method: "POST",

          credentials:
            "include",

          body: formData,
        }
      );

    if (!response.ok) {
      throw new Error(
        "Failed to stream response"
      );
    }

    if (!response.body) {
      throw new Error(
        "Readable stream not available"
      );
    }

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder();

    let buffer = "";

    while (true) {

      const {
        done,
        value,
      } = await reader.read();

      if (done) break;

      buffer += decoder.decode(
        value,
        {
          stream: true,
        }
      );

      const events =
        buffer.split("\n\n");

      buffer =
        events.pop() || "";

      for (
        const rawEvent
        of events
      ) {

        const lines =
          rawEvent
            .split("\n");

        let eventName =
          "";

        let data =
          "";

        for (
          const line
          of lines
        ) {

          if (
            line.startsWith(
              "event:"
            )
          ) {

            eventName =
              line
                .replace(
                  "event:",
                  ""
                )
                .trim();
          }

          if (
            line.startsWith(
              "data:"
            )
          ) {

            data =
              line
                .replace(
                  "data:",
                  ""
                )
                .trim();
          }
        }

        if (
          !eventName
        ) {
          continue;
        }

        try {

          const parsed =
            JSON.parse(
              data
            );

          onEvent(
            eventName,
            parsed
          );

        } catch {

          onEvent(
            eventName,
            data
          );
        }
      }
    }
  };

export default graphArena;