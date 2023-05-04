import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalFilter(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Filter: Select one of the following
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input type='radio' id='expensive' />
          <label htmlFor='expensive'>- Most Expensive Item in Each Category</label>
          <br></br>
          <input type='radio' id='two-items' />
          <label htmlFor='two-items'>
            - users who posted at least two items on the same day with
            <span><br />Category 1:</span>
            <select id='category-select'>
              <option value="-1"></option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Convertible">Convertible</option>
              <option value="Sport">Sport</option>
              <option value="Retro">Retro</option>
            </select>
            <span><br />Category 2:</span>
            <select id='category-select'>
              <option value="-1"></option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Convertible">Convertible</option>
              <option value="Sport">Sport</option>
              <option value="Retro">Retro</option>
            </select>
            <br/>
          </label>
          <br></br>
          <input type='radio' id='exc-good' />
          <label htmlFor='exc-good'>
            - items with comments that are excellent or good by user:
            <input type='text' placeholder='enter a user'></input>
          </label>
          <br></br>
          <input type='radio' id='exc-good' />
          <label htmlFor='exc-good'>- items with comments that are excellent or good</label>
          <br></br>
        </form>

        {/* <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onHide}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalFilter;
