const AddQuiz = (props) => {
    return (
        <div>
            <Input
                invalidMessage="This is a bad value"
                onBeforeChange={function noRefCheck(){}}
                onChange={function noRefCheck(){}}
                onClose={function noRefCheck(){}}
                onComplete={function noRefCheck(){}}
                onOpenPopup={function noRefCheck(){}}
                placeholder="placeholder string"
                popupType="fullscreen"
                size="small"
                subtitle="Title Below Text"
                title="Title Text"
                type="text"
            />
        </div>
    )
}

export default AddQuiz;
