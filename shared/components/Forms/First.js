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
                <textarea className="all-tasks-textarea"></textarea>
            </form>
        </div>
    );
}

export default First;