import { useEffect, useRef, useState } from 'react';

const useToast = () => {
    const [toast, setToast] = useState([]);
    const IDRef = useRef(0);

    const addToast = text => {
        IDRef.current += 1;

        setToast(previousToast => {
            const newToast = {
                ID: IDRef.current,
                text,
                timeoutID: setTimeout(() => {
                    setToast(previousToast => {
                        const toastIndex = previousToast.findIndex(
                            findToast => findToast.ID === newToast.ID
                        );

                        if (toastIndex === -1) {
                            return previousToast;
                        }

                        let cloneToast = JSON.parse(
                            JSON.stringify(previousToast)
                        );
                        cloneToast.splice(toastIndex, 1);
                        return cloneToast;
                    });
                }, 5000)
            };

            return [...previousToast, newToast];
        });
    };

    useEffect(() => {
        return () => {
            setToast(previousToast => {
                previousToast.forEach(toast => {
                    clearTimeout(toast.timeoutID);
                });
            });
        };
    }, []);

    return {
        toast,
        addToast
    };
};

export default useToast;
