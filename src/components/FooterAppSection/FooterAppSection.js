import { Link } from 'react-router-dom'
import classes from './FooterAppSection.module.scss';
import buttonStyles from '../UI/Button/Button.module.scss';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const FooterAppSection = () => {
    return (<footer className={classes.footer}>
         <Card className="text-center"  bg="dark" text='white'>
      <Card.Header>BApp</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Register</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
    </footer>)
}

export default FooterAppSection