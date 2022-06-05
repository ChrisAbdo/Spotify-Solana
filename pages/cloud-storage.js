import Link from "next/link"

const styles = {
    arrowButton: `bg-black mr-2 w-10 h-10 flex items-center justify-center rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-75`,
}



const cloudStorage = () => {
  return (
    <div>
        <div className={styles.arrowButton}>
            <Link href='/'>
                <img alt='' src='assets/chevronLeft.svg' width={20} height={20} />
            </Link>
        </div>
    </div>
  )
}

export default cloudStorage