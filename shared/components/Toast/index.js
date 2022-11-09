import classes from './Toast.module.css';

const Toast = ({ toast }) => {
    return (
        <div className={classes['container']}>
            {toast.map(toast => {
                return (
                    <div key={toast.ID} className={classes['toast']}>
                        {toast.text}
                    </div>
                );
            })}
        </div>
    );
};

export default Toast;
