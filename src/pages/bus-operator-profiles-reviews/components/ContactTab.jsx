import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactTab = ({ operator }) => {
  const [messageForm, setMessageForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', messageForm);
    // Reset form
    setMessageForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Phone" size={20} />
            Contact Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Icon name="Phone" size={18} />
              </div>
              <div>
                <div className="font-medium text-foreground">Customer Service</div>
                <div className="text-sm text-muted-foreground">{operator.contact.phone}</div>
                <div className="text-xs text-muted-foreground">24/7 Support Available</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={18} />
              </div>
              <div>
                <div className="font-medium text-foreground">Email Support</div>
                <div className="text-sm text-muted-foreground">{operator.contact.email}</div>
                <div className="text-xs text-muted-foreground">Response within 24 hours</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={18} />
              </div>
              <div>
                <div className="font-medium text-foreground">Head Office</div>
                <div className="text-sm text-muted-foreground">{operator.contact.address}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Icon name="Globe" size={18} />
              </div>
              <div>
                <div className="font-medium text-foreground">Website</div>
                <div className="text-sm text-primary hover:underline cursor-pointer">
                  {operator.contact.website}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Clock" size={20} />
            Office Hours
          </h3>
          
          <div className="space-y-3">
            {operator.contact.officeHours.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground font-medium">{schedule.day}</span>
                <span className="text-sm text-muted-foreground">{schedule.hours}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-success/10 text-success rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Emergency Support: 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Share2" size={20} />
          Follow Us
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {operator.contact.socialMedia.map((social, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name={social.icon} size={16} className="text-primary" />
              <span className="text-sm text-foreground">{social.platform}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="MessageSquare" size={20} />
          Send Message
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={messageForm.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={messageForm.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <Input
            label="Subject"
            type="text"
            name="subject"
            value={messageForm.subject}
            onChange={handleInputChange}
            placeholder="What is this regarding?"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={messageForm.message}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              rows={5}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
          </div>
          
          <Button type="submit" iconName="Send" iconPosition="right">
            Send Message
          </Button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="HelpCircle" size={20} />
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-4">
          {operator.contact.faq.map((item, index) => (
            <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
              <h4 className="font-medium text-foreground mb-2">{item.question}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactTab;