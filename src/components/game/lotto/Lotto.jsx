import { Form } from 'react-bootstrap';

const Lotto = () => {
    // es6문법 숫자배열 만들기
    var range = [...Array(20)].map((v, i) => i);
    // var range2 = [...Array(5).keys()].map(i => i);
    // var range3 = Array.from({length: 5}, (v,i) => i);
    return (
        <div>
            <p>로또</p>
            <Form>
                {['checkbox'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        {range.map((num) => {
                            return (
                                <>
                                <Form.Check
                                    inline
                                    label={num+1}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                </>
                            )
                        })
                        }
                    </div>
                ))}
            </Form>
        </div>
    )
}

export default Lotto;