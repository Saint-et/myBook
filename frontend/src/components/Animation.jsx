import { useAppContext } from "../contexts/UseAppContext";




const Animation = () => {

    const { animationSelect, systemDetectMobile } = useAppContext()

    let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return;

    if (systemDetectMobile === true) return null

    if (animationSelect === 'eco') return null

    return (
        <>

            <div className="bubbles">
                {num?.map((num) => (
                    <div key={num} className="bubble"></div>
                ))}
            </div>
        </>
    )
}

export default Animation