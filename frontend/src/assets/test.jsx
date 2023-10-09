

{
    promise.type === 'Announcement' && <>
        {promise.adult == null && <>
            <div onClick={() => handleFullScreen(promise.imageUrl[0])} style={{ backgroundImage: `url(${promise.imageUrl[0] || Picture})`, backgroundPosition: `50% ${50}%`, borderRadius: 0, cursor: 'pointer' }} className='CoverImage FlexEmbed FlexEmbed--2by1' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}></div>
        </>}
        {promise.adult == 0 && <>
            <div onClick={() => handleFullScreen(promise.imageUrl[0])} style={{ backgroundImage: `url(${promise.imageUrl[0] || Picture})`, backgroundPosition: `50% ${50}%`, borderRadius: 0, cursor: 'pointer' }} className='CoverImage FlexEmbed FlexEmbed--2by1' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}></div>
        </>}

        {promiseIdentifiedUser.user.adultAccess == 0 && <>
            {promise.adult == 1 && <>
                <div style={{ backgroundImage: `url(${promise.imageUrl[0] || Picture})`, backgroundPosition: `50% ${50}%`, borderRadius: 0, cursor: 'pointer', filter: 'blur(5px)' }} className='CoverImage FlexEmbed FlexEmbed--2by1' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}></div>
            </>}</>}

        {promiseIdentifiedUser.user.adultAccess == 1 && <>
            {promise.adult == 1 && <>
                <div onClick={() => handleFullScreen(promise.imageUrl[0])} style={{ backgroundImage: `url(${promise.imageUrl[0] || Picture})`, backgroundPosition: `50% ${50}%`, borderRadius: 0, cursor: 'pointer' }} className='CoverImage FlexEmbed FlexEmbed--2by1' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}></div>
            </>}</>}
        <h3 translate='no'>{promise.name}</h3>

        {false && <>{promise.data != null && <div className='scrollbar' style={{ width: '100%', maxWidth: 800, maxHeight: 150, overflow: 'auto', textAlign: 'center' }}>
            {parse(promise.data)}
        </div>}</>}
    </>
}

{
    promise.type === 'Article' && <>

        <div translate='no' style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{promise.name}</div>

        {promise.adult == 0 && <>
            {promise.fileLvl === null && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
            </div>}


            {promise.user.premium === 0 && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
            </div>}

            {promise.user.premium === 1 && <>
                {promise.fileLvl === '10-648-656' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                </div>}
                {promise.fileLvl === '10-784-454' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                </div>}
                {promise.fileLvl === '10-898-453' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                </div>}
                {promise.fileLvl === '10-968-576' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[3])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[3] || Picture} alt="" />
                </div>}
                {promise.fileLvl === '10-245-954' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', height: styleImg.heightContainer - 50, overflow: 'hidden' }}>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '60%', maxWidth: 270, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, alignSelf: 'center' }} src={promise.imageUrl[0] || Picture} alt="" />
                    <div className='scrollbar' style={{ width: 200, overflowY: 'scroll', height: styleImg.heightContainer - 70 }}>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                    </div>
                </div>}
                {promise.fileLvl === '10-457-157' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', height: styleImg.heightContainer - 50, overflow: 'hidden' }}>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '60%', maxWidth: 230, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, alignSelf: 'center' }} src={promise.imageUrl[0] || Picture} alt="" />
                    <div className='scrollbar' style={{ width: 200, overflowY: 'scroll', height: styleImg.heightContainer - 70 }}>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[3])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[3] || Picture} alt="" />
                    </div>
                </div>}
            </>}
        </>}
        {promiseIdentifiedUser.user.adultAccess == 0 && <>
            {promise.adult == 1 && <>
                {promise.fileLvl === null && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                    <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                </div>}


                {promise.user.premium === 0 && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                    <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                </div>}


                {promise.user.premium === 1 && <>
                    {promise.fileLvl === '10-648-656' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                    </div>}
                    {promise.fileLvl === '10-784-454' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[1] || Picture} alt="" />
                    </div>}
                    {promise.fileLvl === '10-898-453' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[2] || Picture} alt="" />
                    </div>}
                    {promise.fileLvl === '10-968-576' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[2] || Picture} alt="" />
                        <img onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[3] || Picture} alt="" />
                    </div>}
                    {promise.fileLvl === '10-245-954' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', height: styleImg.heightContainer - 50, overflow: 'hidden' }}>
                        <img className='imgCardArticle' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '60%', maxWidth: 270, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, alignSelf: 'center', filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                        <div className='scrollbar' style={{ width: 200, overflowY: 'scroll', height: styleImg.heightContainer - 70 }}>
                            <img className='imgCardArticle' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[1] || Picture} alt="" />
                            <img className='imgCardArticle' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[2] || Picture} alt="" />
                        </div>
                    </div>}
                    {promise.fileLvl === '10-457-157' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', height: styleImg.heightContainer - 50, overflow: 'hidden' }}>
                        <img className='imgCardArticle' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '60%', maxWidth: 270, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, alignSelf: 'center', filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                        <div className='scrollbar' style={{ width: 200, overflowY: 'scroll', height: styleImg.heightContainer - 70 }}>
                            <img className='imgCardArticle' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[1] || Picture} alt="" />
                            <img className='imgCardArticle' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[2] || Picture} alt="" />
                            <img className='imgCardArticle' onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[3] || Picture} alt="" />
                        </div>
                    </div>}
                </>}
            </>}
        </>}

        {promiseIdentifiedUser.user.adultAccess == 1 && <>
            {promise.adult == 1 && <>
                {promise.fileLvl === null && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                </div>}


                {promise.user.premium === 0 && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                </div>}


                {promise.user.premium === 1 && <>
                    {promise.fileLvl === '10-648-656' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                    </div>}
                    {promise.fileLvl === '10-784-454' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                    </div>}
                    {promise.fileLvl === '10-898-453' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                    </div>}
                    {promise.fileLvl === '10-968-576' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', justifyContent: 'space-between', overflowX: 'auto', alignItems: 'center', overflowY: 'hidden', height: styleImg.heightContainer }}>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[3])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 350, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[3] || Picture} alt="" />
                    </div>}
                    {promise.fileLvl === '10-245-954' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', height: styleImg.heightContainer - 50, overflow: 'hidden' }}>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '60%', maxWidth: 270, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, alignSelf: 'center' }} src={promise.imageUrl[0] || Picture} alt="" />
                        <div className='scrollbar' style={{ overflowY: 'scroll', height: styleImg.heightContainer - 70 }}>
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                        </div>
                    </div>}
                    {promise.fileLvl === '10-457-157' && <div className='scrollbar' style={{ width: '100%', maxWidth: 'max-content', display: 'flex', height: styleImg.heightContainer - 50, overflow: 'hidden' }}>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '60%', maxWidth: 270, borderRadius: 15, objectFit: 'contain', margin: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, alignSelf: 'center' }} src={promise.imageUrl[0] || Picture} alt="" />
                        <div className='scrollbar' style={{ width: 200, overflowY: 'scroll', height: styleImg.heightContainer - 70 }}>
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[3])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', marginTop: 10, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[3] || Picture} alt="" />
                        </div>
                    </div>}
                </>}
            </>}
        </>}

        {promise.price !== 0 && <>{promise.price !== null && <div style={{ fontSize: 16, fontWeight: 800 }}>Price:{promise.price}€</div>}</>}

        {articleInfo === promise.id && <div className='scrollbar animation' style={{ wordBreak: 'break-word', width: '100%', maxWidth: 1000, overflowY: 'auto', height: 400 }}>{parse(promise.data)}</div>}
    </>
}


{
    promise.type === 'Document' && <>
        <div className='scrollbar' style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                {promise.adult == null && <>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                </>}
                {promise.adult == 0 && <>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                </>}

                {promiseIdentifiedUser.user.adultAccess == 0 && <>
                    {promise.adult == 1 && <>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[0] || Picture} alt="" />
                    </>}</>}

                {promiseIdentifiedUser.user.adultAccess == 1 && <>
                    {promise.adult == 1 && <>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[0] || Picture} alt="" />
                    </>}</>}
                <h1 style={{ textAlign: 'center' }}>{promise.name}</h1>
            </div>

            {promise.data != '<p><br></p>' && <>{promise.data != null && <div className='scrollbar' style={{ width: '98%', marginTop: 30, marginBottom: 20 }}>
                {parse(promise.data)}
            </div>}</>}

            {promise.data == null && <div style={{ wordBreak: 'break-word' }}>No info</div>}
            {promise.data == '<p><br></p>' && <div style={{ wordBreak: 'break-word' }}>No info</div>}

            {promise.user.premium === 1 && <>{promise.fileLvl === '13-674-357' && <div className='scrollbar' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {promise.adult == null && <>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                </>}
                {promise.adult == 0 && <>
                    <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                </>}

                {promiseIdentifiedUser.user.adultAccess == 0 && <>
                    {promise.adult == 1 && <>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[1] || Picture} alt="" />
                    </>}</>}

                {promiseIdentifiedUser.user.adultAccess == 1 && <>
                    {promise.adult == 1 && <>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[0])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                    </>}</>}
            </div>}

                {promise.fileLvl === '13-354-759' && <div className='scrollbar' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {promise.adult == null && <>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                    </>}
                    {promise.adult == 0 && <>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                    </>}

                    {promiseIdentifiedUser.user.adultAccess == 0 && <>
                        {promise.adult == 1 && <>
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[1] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[2] || Picture} alt="" />
                        </>}</>}

                    {promiseIdentifiedUser.user.adultAccess == 1 && <>
                        {promise.adult == 1 && <>
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                        </>}</>}
                </div>}

                {promise.fileLvl === '13-852-158' && <div className='scrollbar' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {promise.adult == null && <>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[3])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[3] || Picture} alt="" />
                    </>}
                    {promise.adult == 0 && <>
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                        <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[3])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[3] || Picture} alt="" />
                    </>}

                    {promiseIdentifiedUser.user.adultAccess == 0 && <>
                        {promise.adult == 1 && <>
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[1] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[2] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[3])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight, filter: 'blur(5px)' }} src={promise.imageUrl[3] || Picture} alt="" />
                        </>}</>}

                    {promiseIdentifiedUser.user.adultAccess == 1 && <>
                        {promise.adult == 1 && <>
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[1])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[1] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[2])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[2] || Picture} alt="" />
                            <img className='imgCardArticle' onClick={() => handleFullScreen(promise.imageUrl[3])} onMouseDown={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', maxWidth: 200, borderRadius: 15, objectFit: 'contain', margin: 5, cursor: 'pointer', height: 'max-content', maxHeight: styleImg.maxHeight }} src={promise.imageUrl[3] || Picture} alt="" />
                        </>}</>}
                </div>}</>}

        </div>
    </>
}