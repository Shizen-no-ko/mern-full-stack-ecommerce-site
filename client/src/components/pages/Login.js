import styled from 'styled-components';
import Navbar from '../layout/Navbar';
import SubscriptionForm from '../layout/SubscriptionForm';
import Footer from '../layout/Footer';

const Container = styled.div`

`

const Wrapper = styled.div`

`

const Form = styled.form`

`

const Input = styled.input`

`


const Login = (props) => {
    return (
        <div>
            <Navbar />

            <Container>
                <Wrapper>
                    <Form>
                        <Input name='name' placeholder='Your Name'></Input>
                        <Input name='email' placeholder='Your Email'></Input>
                        <Input name='password' placeholder='Choose a Password'></Input>
                        <Input name='password-confirmation' placeholder='Re-enter Password'></Input>
                    </Form>
                </Wrapper>
            </Container>
            <SubscriptionForm />
            <Footer />
        </div>
    )
}

export default Login