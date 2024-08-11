import React from 'react';
import { Card, Col, Button, Row, Form } from 'react-bootstrap';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';

const DoctorList = ({
  doctors,
  handleEditDoctorClick,
  handleDeleteDoctorClick,
  editingDoctor,
  editDoctorForm,
  handleEditDoctorChange,
  handleEditDoctorsubmit,
  setShowDoctorForm,
}) => {
  return (
    <div>
      <Button variant="success" className="my-4" onClick={() => setShowDoctorForm(true)}>
        CREATE DOCTOR
      </Button>
      <Row>
        {doctors.map((doctor) => (
          <Col key={doctor.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {doctor.name}
                  <BsFillPencilFill className="ms-2" onClick={() => handleEditDoctorClick(doctor)} />
                  <BsFillTrash3Fill className="ms-2" onClick={() => handleDeleteDoctorClick(doctor.id)} />
                </Card.Title>
                <Card.Text>{doctor.Bio}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{doctor.Specialty}</Card.Subtitle>
                {editingDoctor === doctor.id && (
                  <Form onSubmit={handleEditDoctorsubmit}>
                    <Form.Group controlId="formName">
                      <Form.Label>NAME</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={editDoctorForm.name}
                        onChange={handleEditDoctorChange} 
                      />
                    </Form.Group>
                    <Form.Group controlId="formBio">
                      <Form.Label>BIOGRAPHY</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="BIO"
                        value={editDoctorForm.Bio}
                        onChange={handleEditDoctorChange} 
                      />
                    </Form.Group>
                    <Form.Group controlId="formSpecialty">
                      <Form.Label>TOP SERVICES OF THIS DOCTOR</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="Specialty"
                        value={editDoctorForm.Specialty}
                        onChange={handleEditDoctorChange} 
                      />
                    </Form.Group>
                    <Button variant="success" type="submit">
                      SAVE CHANGES
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DoctorList;