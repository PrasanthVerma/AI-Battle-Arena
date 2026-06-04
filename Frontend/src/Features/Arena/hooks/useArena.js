import graphArena, {
    streamArena,
} from "../services/arena.api";

import { useDispatch } from "react-redux";

import {
    setData,
    setLoading,
    setError,

    setStatus,

    appendModel1,
    appendModel2,

    setJudge,

    setStreaming,

    resetStream,
} from "../arena.slice.js";

const useArena = () => {
    const dispatch =
        useDispatch();

    const handleArena = async (
        prompt,
        file = null,
        chatId = null,
        stream = true
    ) => {

        dispatch(
            setLoading(true)
        );

        dispatch(
            resetStream()
        );

        try {

            // ==================
            // STREAMING MODE
            // ==================

            if (stream) {

                dispatch(
                    setStreaming(true)
                );

                let finalResult =
                    null;

                await streamArena(
                    prompt,
                    file,
                    chatId,

                    (
                        event,
                        data
                    ) => {

                        switch (
                        event
                        ) {

                            case "status":

                                dispatch(
                                    setStatus(
                                        data
                                    )
                                );

                                break;

                            case "model_1_chunk":

                                dispatch(
                                    appendModel1(
                                        data
                                    )
                                );

                                break;

                            case "model_2_chunk":

                                dispatch(
                                    appendModel2(
                                        data
                                    )
                                );

                                break;

                            case "judge_result":

                                dispatch(
                                    setJudge(
                                        data
                                    )
                                );

                                break;

                            case "complete":

                                finalResult =
                                    data;

                                dispatch(
                                    setData(
                                        data
                                    )
                                );

                                break;

                            case "error":

                                dispatch(
                                    setError(
                                        data
                                    )
                                );

                                break;

                            default:
                                break;
                        }
                    }
                );

                dispatch(
                    setLoading(false)
                );

                dispatch(
                    setStreaming(false)
                );

                return finalResult;
            }

            // ==================
            // NORMAL MODE
            // ==================

            const data =
                await graphArena(
                    prompt,
                    chatId
                );

            dispatch(
                setData(data)
            );

            dispatch(
                setError(null)
            );

            dispatch(
                setLoading(false)
            );

            return data;

        } catch (error) {

            dispatch(
                setError(
                    error?.message ||
                    "Something went wrong"
                )
            );

            dispatch(
                setLoading(false)
            );

            dispatch(
                setStreaming(false)
            );

            throw error;
        }
    };

    return handleArena;
};

export default useArena;