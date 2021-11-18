const First = () => { 
    return (
        <div>
            <p className="mb-1 font-size-3">
                Dump everything that you need to do
            </p>
            <p className="mb-1 font-size-2">
                make sure to separate them with a enter :)
            </p>

            <form>
                <label
                    htmlFor="allTask"
                    className="d-none">Dump everything that you need to do</label>
                <textarea className="all-tasks-textarea mb-2"></textarea>

                <div className="text-right">
                    <button className="submit-button background-color-yellow">next</button>
                </div>
            </form>
        </div>
    );
}

export default First;